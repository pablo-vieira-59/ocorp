using Backend.Domain.Helpers;

namespace Backend.Domain.DTO
{
    public class FilterDTO
    {
        public FilterDTO() 
        { 
            SearchFields = new List<SearchField>();
        }

        public List<SearchField>? SearchFields { get; set; }
        public Paging? Paging { get; set; }
    }
}
