FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app
# Copy csproj and restore as distinct layers
COPY ReactApp.sln ./

COPY Application ./Application
COPY Domain ./Domain
COPY Infrastructure ./Infrastructure
COPY Persistence ./Persistence
COPY API ./API

RUN dotnet restore

# Copy everything else and build
RUN dotnet publish -c Debug -o out
FROM mcr.microsoft.com/dotnet/core/aspnet
WORKDIR /app
COPY --from=build-env /app/out .

ENTRYPOINT ["dotnet", "API.dll"]
