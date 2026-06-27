using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Postgres.Scaffolding;
using Microsoft.AspNetCore.Http.Metadata;
using Microsoft.AspNetCore.Mvc;

DotNetEnv.Env.Load("../efscaffold/.env");

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MyDbContext>(conf =>
{
    conf.UseNpgsql(Environment.GetEnvironmentVariable("CONN_STR"));
});

var app = builder.Build(); 

app.MapGet(pattern: "", ([FromServices]MyDbContext myDbContext) =>
{
    return myDbContext.Todos.ToList();
});

app.Run();