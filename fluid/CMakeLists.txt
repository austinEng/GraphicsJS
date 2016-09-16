cmake_minimum_required(VERSION 2.8)

# project(graphics.js_fluid)

# set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -s SIDE_MODULE=1 ")

set(SOURCE_FILES
  container.cpp
  grid.cpp
  mac_grid.cpp
)
include_directories(include)
include_directories(../core/include)
include_directories(../third_party)
add_library(fluid ${SOURCE_FILES})
# target_include_directories(fluid INTERFACE include)
# add_executable(${PROJECT_NAME} ${SOURCE_FILES})
# add_library(${PROJECT_NAME} STATIC ${SOURCE_FILES})
# target_include_directories(${PROJECT_NAME} PUBLIC include)

# install(TARGETS ${PROJECT_NAME} DESTINATION .)
