FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
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
RUN dotnet publish -c Debug /p:PublishTrimmed=true -o /out
FROM mcr.microsoft.com/dotnet/aspnet:3.1 as final
RUN groupadd --gid 1000 aspnet \
    && useradd --uid 1000 --gid aspnet --shell /bin/bash --create-home aspnet
WORKDIR /app
USER aspnet
COPY --from=build /out ./
WORKDIR /app

ENTRYPOINT ["dotnet", "API.dll"]
