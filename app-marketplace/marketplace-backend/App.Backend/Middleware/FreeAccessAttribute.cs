namespace App.Backend.Livraria.Middleware
{
    using System;

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    public class FreeAccessAttribute : Attribute
    {
    }
}
