using Backend.Domain.DTO;
using Backend.Domain.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Infrastructure.Repository.Interfaces
{
    public interface IAddressRepository : IBaseRepository<Address>
    {
        public IQueryable<Address> GetClientAddresses(long clientId, FilterDTO? filter = null);
    }
}
