cmake_minimum_required(VERSION 2.8)

# project(graphics.js_canvas)

# set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s SIDE_MODULE=1 ")

set(SOURCE_FILES
  canvas.cpp
  shaders.cpp
)
include_directories(include)

add_library(canvas ${SOURCE_FILES})
target_include_directories(canvas INTERFACE include)
# add_executable(${PROJECT_NAME} ${SOURCE_FILES})

# install(TARGETS ${PROJECT_NAME} DESTINATION .)
