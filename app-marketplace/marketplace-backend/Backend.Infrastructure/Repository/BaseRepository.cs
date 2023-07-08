using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;
using System.Linq.Dynamic.Core;
using System.Reflection;

namespace Backend.Infrastructure.Repository
{
    public class BaseRepository<T>: IBaseRepository<T> where T : class
    {
        public readonly Context.AppContext _context;

        public BaseRepository(Context.AppContext context)
        {
            _context = context;
        }

        public async Task<T> AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        public async Task<T> UpdateAsync(T entity)
        {
            _context.Set<T>().Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        public async Task<T> DeleteAsync(T entity)
        {
            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<ICollection<T>> AddManyAsync(ICollection<T> entities)
        {
            await _context.Set<T>().AddRangeAsync(entities);
            await _context.SaveChangesAsync();
            return entities;
        }

        public IQueryable<T> Get(FilterDTO? filter = null)
        {
            IQueryable<T> query = _context.Set<T>().AsQueryable();

            // Check if filters exists
            if (filter == null)
            {
                return query;
            }

            // Remove Searchfields where value is null
            if (filter.SearchFields != null)
            {
                filter.SearchFields.RemoveAll(e => String.IsNullOrEmpty(e.Value));
            }

            // Check if searchFields exists
            if (filter.SearchFields != null && filter.SearchFields.Count != 0)
            {
                string expression = "e => e";
                bool hasAnd = false;
                Type typeAux = typeof(T);
                PropertyInfo? propertyInfo = null;
                var allowedOperators = new List<string> { "==", "!=", ">", "<", ">=", "<=", "like", "contains" };
                foreach (SearchField searchField in filter.SearchFields)
                {

                    // Check if is there more than one searchfield
                    if (hasAnd)
                    {
                        expression += " && e";
                    }

                    // Check if operator exists , if not set '==' as default
                    if (String.IsNullOrEmpty(searchField.Operator) || !allowedOperators.Contains(searchField.Operator))
                    {
                        searchField.Operator = "==";
                    }

                    // Try get the type of the property
                    if (!String.IsNullOrEmpty(searchField.Property))
                    {
                        propertyInfo = typeAux.GetProperty(searchField.Property);
                    }


                    if (propertyInfo != null)
                    {
                        switch (propertyInfo.PropertyType.Name)
                        {
                            case "String":
                                switch (searchField.Operator)
                                {
                                    case "like":
                                        expression += $".{searchField.Property}.ToLower().Contains(\"{searchField.Value}\".ToLower())";
                                        break;

                                    default:
                                        expression += $".{searchField.Property} {searchField.Operator} \"{searchField.Value}\"";
                                        break;
                                }
                                break;

                            case "DateTime":
                                DateTime searchDate = DateTime.Parse(searchField.Value);
                                expression += $".{searchField.Property} {searchField.Operator} DateTime({searchDate.Year}, {searchDate.Month}, {searchDate.Day})";
                                break;

                            default:
                                expression += $".{searchField.Property} {searchField.Operator} {searchField.Value}";
                                break;
                        }
                    }
                    else
                    {
                        if (searchField.Operator == "contains")
                        {
                            expression += $".{searchField.Property}.Contains({searchField.Value})";
                        }
                        else
                        {
                            expression += $".{searchField.Property} {searchField.Operator} {searchField.Value}";
                        }
                    }

                    hasAnd = true;
                }

                query = query.Where(expression);
            }

            // Check if paging exists
            if (filter.Paging != null)
            {
                // Add Order By
                if (filter.Paging.OrderBy != null)
                {
                    query = query.OrderBy(filter.Paging.OrderBy);

                    if (filter.Paging.Descending)
                    {
                        query = query.Reverse();
                    }
                }

                // Add Pagination
                if (filter.Paging.Page > 0)
                {
                    var result = query.Skip((filter.Paging.Page - 1) * filter.Paging.ItemsPerPage).Take(filter.Paging.ItemsPerPage);
                    return result;
                }
            }

            return query;
        }
    
        public IQueryable<T> GetByProperty(string property, string value)
        {
            var filter = new FilterDTO();
            filter.Paging = null;
            filter.SearchFields = new List<SearchField>
            {
                new SearchField { Property = property, Value = value }
            };

            return Get(filter);
        }
    }
    
}
