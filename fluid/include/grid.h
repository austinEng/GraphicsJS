//
// Created by austin on 3/20/16.
//

#ifndef FLUIDSOLVER_GRID_H
#define FLUIDSOLVER_GRID_H

#include <vector>
#include <graphicsjs.h>
#include <functional>

template <typename T> class Grid {

public:
    Grid();
    Grid(const glm::vec3 &origin, const glm::vec3 &offset, const glm::vec3 &dim, float size);

    T& operator()(std::size_t idx);
    const T& operator()(std::size_t idx) const;
    T& operator()(std::size_t i, std::size_t j, std::size_t k);
    const T& operator()(std::size_t i, std::size_t j, std::size_t k) const;
    T& atIdx(std::size_t i, std::size_t j, std::size_t k);
    const T& atIdx(std::size_t i, std::size_t j, std::size_t k) const;
    T& operator()(const glm::ivec3 &idx);
    const T& operator()(const glm::ivec3 &idx) const;
    T& atIdx(const glm::ivec3 &idx);
    const T& atIdx(const glm::ivec3 &idx) const;

    T& at(float x, float y, float z);
    const T& at(float x, float y, float z) const;
    T& at(const glm::vec3 &pos);
    const T& at(const glm::vec3 &pos) const;

    glm::ivec3 indexOf(const glm::vec3 &pos) const;
    void indexOf(const glm::vec3 &pos, size_t &i, size_t &j, size_t &k) const;
    glm::vec3 positionOf(const glm::ivec3 &idx) const;
    glm::vec3 positionOf(size_t i, size_t j, size_t k) const;
    glm::vec3 fractionalIndexOf(const glm::vec3 &pos) const;

    glm::ivec3 toIJK(const std::size_t index) const;
    void toIJK(const std::size_t index, size_t &i, size_t &j, size_t &k) const;
    std::size_t fromIJK(const std::size_t i, const std::size_t j, const std::size_t k) const;
    std::size_t fromIJK(const glm::ivec3 &ijk) const;

    void iterate(const std::function<void(size_t i, size_t j, size_t k)> &cb, bool parallel=true);
    void iterateRegion(size_t i, size_t j, size_t k, size_t I, size_t J, size_t K, const std::function<void(size_t i, size_t j, size_t k)> &cb, bool parallel=true);

    void iterateNeighborhood(size_t i, size_t j, size_t k, size_t r, const std::function<void(size_t i, size_t j, size_t k)> &cb, bool parallel=true);
    void getNeighboorhood(size_t i, size_t j, size_t k, size_t r, size_t &si, size_t &ei, size_t &sj, size_t &ej, size_t &sk, size_t &ek);

    void clear(const T &zeroVal);

    bool checkIdx(size_t i, size_t j, size_t k) const;
    bool checkIdx(const glm::ivec3 &idx) const;

    size_t countX() const;
    size_t countY() const;
    size_t countZ() const;
    size_t size() const;

    virtual ~Grid();

private:
    std::vector<T> _contents;
    glm::vec3 _origin;
    glm::vec3 _offset;
    glm::vec3 _dim;
    float _cellSize;
    size_t _countX;
    size_t _countY;
    size_t _countZ;
};

#endif //FLUIDSOLVER_GRID_H
