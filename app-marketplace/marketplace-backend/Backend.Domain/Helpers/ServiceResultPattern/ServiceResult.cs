﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Helpers
{
    public class ServiceResult<T>
    {
        public T Value { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; }
        public List<string> Errors { get; set; }

        public ServiceResult() 
        {
        
        }
    }
}
