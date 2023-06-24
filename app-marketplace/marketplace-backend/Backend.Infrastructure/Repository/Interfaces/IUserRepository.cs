﻿using Backend.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Infrastructure.Repository.Interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        IQueryable<User> GetByUsername(string userName);
    }
}
