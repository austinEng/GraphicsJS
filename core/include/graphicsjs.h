#ifndef GRAPHICSJS_H
#define GRAPHICSJS_H

#define GLM_FORCE_RADIANS

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>
#include <glm/gtx/string_cast.hpp>
#include <glm/gtx/norm.hpp>

static const float PI = 3.14159265358979323846f;
static const float TWO_PI = 2 * PI;
static const float DEG2RAD = PI / 180.f;
static const float RAD2DEG = 180.f / PI;

// Float approximate-equality comparison
template<typename T>
inline bool fequal(T a, T b, T epsilon = 0.0001){
    if (a == b) {
        // Shortcut
        return true;
    }

    const T diff = std::abs(a - b);
    if (a * b == 0) {
        // a or b or both are zero; relative error is not meaningful here
        return diff < (epsilon * epsilon);
    }

    return diff / (std::abs(a) + std::abs(b)) < epsilon;
}

#endif /* end of include guard: GRAPHICSJS_H */
