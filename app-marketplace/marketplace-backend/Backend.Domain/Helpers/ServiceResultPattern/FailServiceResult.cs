using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Helpers.ServiceResultPattern
{
    public class FailServiceResult<T> : ServiceResult<T>
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
}
