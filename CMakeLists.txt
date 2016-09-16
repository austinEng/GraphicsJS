cmake_minimum_required(VERSION 2.8)

project(graphics.js)
include(ExternalProject)

ExternalProject_Add(emscripten
  SOURCE_DIR ${PROJECT_SOURCE_DIR}/EMSCRIPTEN
  CMAKE_COMMAND emconfigure cmake
  CMAKE_ARGS
    -DCMAKE_C_COMPILER=emcc
    -DCMAKE_CXX_COMPILER=em++
    -DCMAKE_INSTALL_PREFIX=${PROJECT_SOURCE_DIR}/CLIENT/emscripten
)
