using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Helpers
{
    public class FailServiceResult<T> : ServiceResult<T> where T : class
    {
        public FailServiceResult(string message, List<string> errors)
        {
            Success = false;
            Message = message;
            Errors = errors;
        }

        public FailServiceResult(string message)
        {
            Success = false;
            Message = message;
        }
    }

    public class FailServiceResultStruct<T> : ServiceResult<T> where T : struct
    {
        public FailServiceResultStruct(string message)
        {
            Success = false;
            Message = message;
        }
    }
}
