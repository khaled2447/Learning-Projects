using Npgsql;
using Microsoft.Extensions.Configuration;

// Load connection string from appsettings.json
var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
string connString = config.GetConnectionString("NeonConnection");

// Establish connection
await using var conn = new NpgsqlConnection(connString);
await conn.OpenAsync();

// Execute a sample query
await using var cmd = new NpgsqlCommand("SELECT version();", conn);
await using var reader = await cmd.ExecuteReaderAsync();

while (await reader.ReadAsync())
{
    Console.WriteLine($"Connected to: {reader.GetString(0)}");
}
