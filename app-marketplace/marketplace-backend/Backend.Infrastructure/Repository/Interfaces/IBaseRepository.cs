using Backend.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Infrastructure.Repository.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        Task<T> AddAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task<T> DeleteAsync(T entity);
        Task<ICollection<T>> AddManyAsync(ICollection<T> entities);
        IQueryable<T> GetByProperty(string property, string value);
        IQueryable<T> Get(FilterDTO? filter = null);
    }
}
