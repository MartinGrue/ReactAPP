#!/bin/bash
ln -fs .dockerignore.backend .dockerignore
docker build -f Dockerfile.prod.backend -t reactappbackend .