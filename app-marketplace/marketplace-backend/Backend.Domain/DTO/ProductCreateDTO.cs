namespace Backend.Domain.DTO
{
    public class ProductCreateDTO
    {
        public required string Name { get; set; }
        public string? Description { get; set; }
        public required decimal Price { get; set; }
        public required string ImageGuid { get; set; }
        public required long SubcategoryId { get; set; }
        public required List<long> BrandIds { get; set; }
    }
}
