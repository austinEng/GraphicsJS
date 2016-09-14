
// #include "common/esUtil.h"


// int Init ( ESContext *esContext ) {
//   glClearColor ( 0.0f, 0.0f, 0.0f, 0.0f );
//   return GL_TRUE;
// }

// void Draw ( ESContext *esContext ) {
  
// }

// int main ( int argc, char *argv[] )
// {
//   ESContext esContext;
//   // UserData  userData;

//   esInitContext ( &esContext );
//   // esContext.userData = &userData;

//   esCreateWindow ( &esContext, "Hello Triangle", 320, 240, ES_WINDOW_RGB );

//   if ( !Init ( &esContext ) )
//     return 0;
  
//   esRegisterDrawFunc ( &esContext, Draw );

//   esMainLoop ( &esContext );
// }

#include <iostream>
#include <GLES2/gl2.h>
#include <GLES2/gl2ext.h>
#include <SDL/SDL.h>
#include <emscripten.h>

#include "shaders.h"

GLuint programObject;
SDL_Surface* screen;

GLfloat vVertices[] = {
  0.0f, 0.5f, 0.0f,
  -0.5f, -0.5f, 0.0f,
  0.5f, -0.5f, 0.0f
};
GLint uniformOriginX, uniformOriginY, uniformZoom;

extern "C" int initGL(int width, int height) {
  if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_AUDIO | SDL_INIT_TIMER) == 0)  {
    SDL_GL_SetAttribute( SDL_GL_RED_SIZE, 8 );
    SDL_GL_SetAttribute( SDL_GL_GREEN_SIZE, 8 );
    SDL_GL_SetAttribute( SDL_GL_BLUE_SIZE, 8 );
    SDL_GL_SetAttribute( SDL_GL_ALPHA_SIZE, 8 );
    SDL_GL_SetAttribute( SDL_GL_DEPTH_SIZE, 16 );
    SDL_GL_SetAttribute(SDL_GL_MULTISAMPLEBUFFERS, 1);
    SDL_GL_SetAttribute(SDL_GL_MULTISAMPLESAMPLES, 4);
    SDL_GL_SetAttribute(SDL_GL_DOUBLEBUFFER, 1);
    screen = SDL_SetVideoMode(width, height, 0, SDL_OPENGL);
    if (screen == NULL) {
      std::cerr << "Could not set video mode: " << SDL_GetError() << std::endl;
      return 0;
    }
  } else {
    std::cerr << "Could not initialize SDL: " << SDL_GetError() << std::endl;
    return 0;
  }

  glEnable(GL_BLEND); 
  glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
  glClearColor(0,0,0,0);
  glViewport(0, 0, width, height);
  glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
  std::cout << "Initialized GL" << std::endl;


  const char vertexShaderSource[] =
    "attribute vec4 vPosition;                         \n"
    "uniform float originX, originY;                     \n"
    "uniform float zoom;                                 \n"
    "varying vec3 color;                                 \n"
    "void main()                                         \n"
    "{                                                   \n"
    "   gl_Position = vPosition;                         \n"
    "   gl_Position.x = (originX + gl_Position.x) * zoom;\n"
    "   gl_Position.y = (originY + gl_Position.y) * zoom;\n"
    "   color = gl_Position.xyz + vec3(0.5);             \n"
    "}                                                   \n";

  const char fragmentShaderSource[] =
    "precision mediump float;                     \n"
    "varying vec3 color;                          \n"
    "void main()                                  \n"
    "{                                            \n"
    "  gl_FragColor = vec4 ( color, 1.0 );        \n"
    "}                                            \n";

  //load vertex and fragment shaders
  GLuint vertexShader = loadShader(GL_VERTEX_SHADER, vertexShaderSource);
  GLuint fragmentShader = loadShader(GL_FRAGMENT_SHADER, fragmentShaderSource);
  programObject = buildProgram(vertexShader, fragmentShader, "vPosition");

  //save location of uniform variables
  uniformOriginX = glGetUniformLocation(programObject, "originX");
  uniformOriginY = glGetUniformLocation(programObject, "originY");
  uniformZoom = glGetUniformLocation(programObject, "zoom");

  return 1;
  

  // glfwWindowHint(GLFW_SAMPLES, 4); // 4x antialiasing
  // glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3); // We want OpenGL 3.3
  // glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
  // glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE); // To make MacOS happy; should not be needed
  // glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE); //We don't want the old OpenGL 

  // GLFWwindow* window; // (In the accompanying source code, this variable is global)
  // window = glfwCreateWindow(width, height, "Tutorial 01", NULL, NULL);
  // if( window == NULL ) {
  //     std::cerr << "Failed to create window" << std::endl;
  //     glfwTerminate();
  //     return 0;
  // }
  // glfwMakeContextCurrent(window); // Initialize GLEW
  // glewExperimental=true;
  
  /*if (!glfwInit()) {
    std::cerr << "glfwInit() glfwInit" << std::endl;
    glfwTerminate();
    return 0;
  }*/

  std::cout << "Initialized GL" << std::endl;
  return 1;
}

extern "C" int clearGL() {
  glDisable(GL_SCISSOR_TEST);
  glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
  return 1;
}

extern "C" int resizeGL(int width, int height) {
  glViewport(0, 0, width, height);
  return 1;
}

extern "C" int scissorViewport(int left, int bottom, int width, int height) {
  glEnable(GL_SCISSOR_TEST);
  glScissor(left, bottom, width, height);
  glViewport(left, bottom, width, height);
  return 1;
}

extern "C" int drawTriangle() {
  glClear(GL_COLOR_BUFFER_BIT);
  glUseProgram(programObject);
  glUniform1f(uniformOriginX, 0);
  glUniform1f(uniformOriginY, 0);
  glUniform1f(uniformZoom, 1);
  glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 0, vVertices);
  glEnableVertexAttribArray(0);
  glDrawArrays(GL_TRIANGLES, 0, 3);
  SDL_GL_SwapBuffers();    
  return 1;
}