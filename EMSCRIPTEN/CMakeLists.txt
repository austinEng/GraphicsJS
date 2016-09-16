cmake_minimum_required(VERSION 2.8)

project(graphics.js_emscripten)

set(CMAKE_CXX_FLAGS ${CMAKE_CXX_FLAGS} "--bind -s NO_EXIT_RUNTIME=1 -s FULL_ES2=1 -s EXPORTED_FUNCTIONS=@${PROJECT_SOURCE_DIR}/exports.txt")

include_directories(../third_party/glm)
add_subdirectory(../core ${PROJECT_SOURCE_DIR}/core)
add_subdirectory(../fluid ${PROJECT_SOURCE_DIR}/fluid)
add_subdirectory(../canvas ${PROJECT_SOURCE_DIR}/canvas)

add_executable(graphics main.cpp)
target_link_libraries(graphics canvas fluid core)
install(TARGETS graphics DESTINATION .)
