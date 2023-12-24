using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Application.Services.Interfaces;
using Backend.Infrastructure.Repository.Interfaces;
using Backend.Domain.DTO;
using Microsoft.EntityFrameworkCore;
using Backend.Domain.Helpers.ServiceResultPattern;
using Backend.Infrastructure.Repository;

namespace Backend.Application.Services
{
    public class CategoryService : ICategoryService
    {
        ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<ServiceResult<PaginatedResult<Category>>> AllPaginated(FilterDTO filter, User currentUser)
        {
            if (filter.SearchFields == null)
            {
                filter.SearchFields = new List<SearchField>();
            }

            if (currentUser.ProfileId != (int)ProfileEnum.Admin)
            {
                filter.SearchFields.Add(new SearchField
                {
                    Property = "ClientId",
                    Value = currentUser.ClientId.ToString(),
                });
            }

            var categories = await Category.ToBasic(_categoryRepository.Get(filter)).ToListAsync();

            var totalCount = categories.Count();

            if (filter.Paging != null)
            {
                filter.Paging.Page = 0;

                totalCount = await _categoryRepository.Get(filter).CountAsync();
            }

            var result = new PaginatedResult<Category>
            {
                Items = categories,
                TotalCount = totalCount
            };

            return new OkServiceResult<PaginatedResult<Category>>(result);
        }

        public async Task<ServiceResult<Category>> GetById(long id)
        {
            var product = await Category.ToBasic(_categoryRepository.GetByProperty("Id", id.ToString())).FirstOrDefaultAsync();

            if(product == null)
            {
                return new FailServiceResult<Category>("Produto não encontrado.");
            }

            var result = new OkServiceResult<Category>(product);

            return result;
        }
    
        public async Task<ServiceResult<bool>> Create(CategoryCreateDTO request, User currentUser)
        {
            var existing = await _categoryRepository.GetByProperty("Name", request.Name).FirstOrDefaultAsync();

            if (existing != null)
            {
                return new FailServiceResult<bool>("Categoria já cadastrada.");
            }

            if(request.SubCategories.Select(x => x.Name!.ToLower()).Distinct().Count() != request.SubCategories.Count)
            {
                return new FailServiceResult<bool>("Subcategorias duplicadas.");
            }

            var category = new Category
            {   
                Name = request.Name,
                Color = request.Color,
                ClientId = currentUser.ClientId,
            };

            var subcategories = new List<SubCategory>();

            foreach (var subcategory in request.SubCategories)
            {
                subcategories.Add(new SubCategory
                {
                    Color = subcategory.Color,
                    Name = subcategory.Name,
                });
            }

            category.SubCategories = subcategories;

            await _categoryRepository.AddAsync(category);

            return new OkServiceResult<bool>(true);
        }

        public async Task<ServiceResult<bool>> Edit(CategoryEditDTO request, User currentUser)
        {
            var category = await _categoryRepository.GetByProperty("Id", request.Id.ToString()).Include(z => z.SubCategories).FirstOrDefaultAsync();

            if (category == null)
            {
                return new FailServiceResult<bool>("Categoria não encontrada.");
            }

            var existing = await _categoryRepository.GetByProperty("Name", request.Name).FirstOrDefaultAsync();

            if (existing != null && existing.Id != category.Id)
            {
                return new FailServiceResult<bool>("Categoria já cadastrada.");
            }

            if (request.SubCategories.Select(x => x.Name!.ToLower()).Distinct().Count() != request.SubCategories.Count)
            {
                return new FailServiceResult<bool>("Subcategorias duplicadas.");
            }

            category.Color = request.Color;
            category.Name = request.Name;

            foreach (var subcategory in request.SubCategories)
            {
                var existingName = category.SubCategories!.Where(x => x.Name == subcategory.Name).FirstOrDefault();

                if(existingName != null && existingName.Id != subcategory.Id)
                {
                    return new FailServiceResult<bool>("Subcategoria duplicada.");
                }

                var existingSub = category.SubCategories!.Where(x => x.Id == subcategory.Id).FirstOrDefault();

                if (existingSub == null)
                {
                    var newSubcategory = new SubCategory
                    {
                        CategoryId = category.Id,
                        Name = subcategory.Name,
                        Color = subcategory.Color,
                    };

                    category.SubCategories!.Add(newSubcategory);
                    continue;
                }

                existingSub.Color = subcategory.Color;
                existingSub.Name = subcategory.Name;
            }

            await _categoryRepository.UpdateAsync(category);

            return new OkServiceResult<bool>(true);
        }

    }
}
