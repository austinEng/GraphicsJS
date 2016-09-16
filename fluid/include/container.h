#ifndef CONTAINER_H
#define CONTAINER_H

#include <graphicsjs.h>
#include "particle.h"
#include "mac_grid.h"
#include <Eigen/Sparse>

class FluidContainer {
public:
  FluidContainer(float width, float height, float depth, float res);
  ~FluidContainer();

  MACGrid<std::vector<FluidParticle*> >* _MAC;

  void init();

  void projectVelocitiesToGrid();
  void transferVelocitiesToParticles();
  void enforceBoundary();
  void pressureSolve(float step);
  void gravitySolve(float step);
  void extrapolateVelocity();
  void updateParticlePositions(float step);
  void resolveCollisions();
  void updateCells();

  void update(float step = 0.04166f);

private:
  std::vector<FluidParticle> _particles;

  float res;
  glm::vec3 size;
  float _cell_size;
  float particle_radius;

  static float g;

  Eigen::SparseMatrix<double> A;
  Eigen::VectorXd b;
  Eigen::VectorXd x;

  size_t frame;

  template <typename T> void particleAttributeToGrid(std::size_t offset, Grid<T> &grid, float radius, T zeroVal);
  template <typename T> T interpolateAttribute(const glm::vec3 &pos, Grid<T> &grid);
};

#endif /* end of include guard: CONTAINER_H */
