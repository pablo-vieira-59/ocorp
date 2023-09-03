using Backend.Application.Services.Interfaces;
using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Domain.Helpers.ServiceResultPattern;
using Backend.Infrastructure.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Backend.Application.Services
{
    public class AttachmentService : IAttachmentService
    {
        IAttachmentRepository _attachmentRepository;
        private const string StorageFolderPath = "Attachments";

        public AttachmentService(IAttachmentRepository attachmentRepository)
        {
            _attachmentRepository = attachmentRepository;
        }

        public async Task<ServiceResult<string>> Create(AttachmentCreateDTO request)
        {
            if (request.File == null || request.File.Length == 0)
            {
                return new FailServiceResult<string>("No file was uploaded.");
            }

            var splits = request.File.FileName.Split('.');

            if (splits.Length == 0)
            {
                return new FailServiceResult<string>("Formato inválido.");
            }

            var attachmentType = await _attachmentRepository.GetAttachmentTypeAsync(request.AttachmentTypeId);

            if(attachmentType == null)
            {
                return new FailServiceResult<string>("Tipo inválido.");
            }

            var extension = splits[splits.Length - 1];

            var attachment = new Attachment
            {
                AttachmentTypeId = request.AttachmentTypeId,
                Guid = Guid.NewGuid(),
                Type = request.File.ContentType,
                Extension = extension,
            };

            var folderName = attachmentType.Folder;
            var fileName = $"{attachment.Guid.ToString()}.{extension}";
            var directory = $"{StorageFolderPath}/{folderName}";
            var filePath = $"{directory}/{fileName}";

            filePath = Path.GetFullPath(filePath);

            Console.WriteLine(filePath);

            Directory.CreateDirectory(directory);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await request.File.CopyToAsync(stream);
            }

            await _attachmentRepository.AddAsync(attachment);

            return new OkServiceResult<string>(attachment.Guid.ToString()!);
        }

        public async Task<ServiceResult<AttachmentGetDTO>> Get(Guid guid)
        {
            var query = _attachmentRepository.GetByGuid(guid);

            var attachment = await query
                .Select(x => new Attachment
                {
                    Guid = x.Guid,
                    Extension = x.Extension,
                    Type = x.Type,
                    AttachmentType = new AttachmentType
                    {
                        Folder = x.AttachmentType!.Folder,
                    }
                }).FirstOrDefaultAsync();

            if(attachment == null)
            {
                return new FailServiceResult<AttachmentGetDTO>("Arquivo não encontrado.");
            }

            var fileName = $"{attachment.Guid}.{attachment.Extension}";
            var filePath = $"{StorageFolderPath}/{attachment.AttachmentType!.Folder}/{fileName}";

            filePath = Path.GetFullPath(filePath);
            Console.WriteLine(filePath);

            if (!File.Exists(filePath))
            {
                return new FailServiceResult<AttachmentGetDTO>("Arquivo não encontrado.");
            }

            var imageBytes = System.IO.File.ReadAllBytes(filePath);

            var result = new AttachmentGetDTO { Data = imageBytes , Type = attachment.Type! };

            return new OkServiceResult<AttachmentGetDTO>(result);
        }
    }
}
