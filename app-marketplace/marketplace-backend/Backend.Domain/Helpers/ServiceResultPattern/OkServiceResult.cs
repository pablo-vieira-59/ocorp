namespace Backend.Domain.Helpers.ServiceResultPattern
{
    public class OkServiceResult<T> : ServiceResult<T>
    {
        public OkServiceResult(T value)
        {
            Value = value;
            Success = true;
        }
    }
}
