FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build-env
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
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2
WORKDIR /app
COPY --from=build-env /app/Application/out .
COPY --from=build-env /app/Domain/out .
COPY --from=build-env /app/Infrastructure/out .
COPY --from=build-env /app/Persistence/out .
COPY --from=build-env /app/API/out .

ENTRYPOINT ["dotnet", "API.dll"]
