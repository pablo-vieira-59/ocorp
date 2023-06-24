namespace Backend.Domain.Helpers
{
    public class OkServiceResult<T> : ServiceResult<T> where T : class
    {
        public OkServiceResult(T value)
        {
            Value = value;
            Success = true;
        }
    }

    public class OkServiceResultStruct<T> : ServiceResult<T> where T : struct
    {
        public OkServiceResultStruct(T value)
        {
            Value = value;
            Success = true;
        }
    }
}
