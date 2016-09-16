#ifndef PARTICLE_H
#define PARTICLE_H

#include <graphicsjs.h>

struct FluidParticle {
    glm::vec3 pos;
    glm::vec3 pos_old;
    glm::vec3 vel;
    glm::vec3 col;
    glm::ivec3 cell;

    FluidParticle() {
        pos = glm::vec3(0);
        pos_old = glm::vec3(0);
        vel = glm::vec3(0,0,0);
        col = glm::vec3(0.0f, 0.0f, 1.f);
    }
};


#endif /* end of include guard: PARTICLE_H */
