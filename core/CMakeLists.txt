
# add_subdirectory(${CMAKE_CURRENT_SOURCE_DIR}/../ext ${CMAKE_CURRENT_BINARY_DIR}/ext)

# add_executable(test test.cpp)

cmake_minimum_required(VERSION 2.8)
include_directories(include)
include_directories(../third_party/glm)
set(SOURCE_FILES
  test.cpp
)
add_library(core ${SOURCE_FILES})
target_include_directories(core INTERFACE include)
