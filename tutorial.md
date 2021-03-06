# Prerequisites

## Trig

The angle sum identities are needed.

$$sin(a + b) = sin(a) cos(b) + cos(a) sin(b)$$
$$cos(a + b) = cos(a) cos(b) - sin(a) sin(b)$$

Since $cos(-x) = cos(x)$ and $sin(-x) = - sin(x)$, we have:

$$sin(a - b) = sin(a) cos(b) - cos(a) sin(b)$$
$$cos(a - b) = cos(a) cos(b) + sin(a) sin(b)$$

## Calculus

Differential calculus, including the derivatives of vector-valued functions.

## Linear algebra

Vector spaces.

Matrix multiplication and how matrices can represent linear maps.

The standard inner product on $\mathbb{R}^n$. Orthogonal vectors. Vector norms, unit vectors.

Cross product of 3D vectors.

## Affine spaces

An **affine space** is a pair $(A, V, -)$ where $V$ is a vector space and $A$ is any set and $-$ is a binary operation on $A$ such that

 - for any $p \in A$ and $v \in \mathbb{R}^2$, $\exists! q \in A$ such that $q - p = v$.
 - for any $p, q, r \in A$, $r-p = (r-q) + (q-p)$

The first axiom means that we can define an operation $p \to v$ for any point $p$ in the affine space and any vector $v$ by

$$p \to v := q$$

where $q$ is the unique point such that $q-p = v$.

Let $p \in A$ and $v_1, v_2 \in V$. Let $p_1 := p \to v_1$ and $p_2 := p \to v_2$. By axiom 2, $p_2 - p = v_1 + v_2$, which establishes

$$(p \to v_1) \to v_2 = p \to (v_1 + v_2)$$

TODO: Decide if this needs to be expanded. Doing so would be getting pretty pedantic.

## Others that I need to fit in somewhere

 - Rotation matrices

 - reflection about pi/4

 - Time-derivative of a matrix-valued function and the product rule (needed for "Coriolis theorem"


# Introduction

Suppose that we are inside an affine space $A$ over $\mathbb{R}^2$. A **coordinate system** is a pair of orthonormal vectors $(u_1, u_2)$ from $\mathbb{R}^2$ that is *right-handed*, meaning that $u_2$ is the rotation of $u_1$ counterclockwise by 90 degrees.

A **reference frame** is a pair $(O, \mathcal{C})$ where $O$ is a point in $A$ (called the **origin**) and $\mathcal{C}$ is a coordinate system.

Let $v$ be a vector in $\mathbb{R}^2$. Then if $C = (c_1, c_2)$ is a coordinate system, we say that $w = (w_1, w_2) \in \mathbb{R}^2$ is a **coordinate vector for $v$ with respect to $C$** if $v = w_1 c_1 + w_2 c_2$.

TODO: graphic that shows the coordinate vectors for two different coordinate systems for some vector.

If $C = (c_1, c_2)$ and $D = (d_1, d_2)$ are coordinate systems, we can define a $2 \times 2$ matrix $H_{CD}$ (which we will shorten to just $H$ when it is clear which coordinate systems we are talking about) by $H_{ij} := d_i \cdot c_j$. Such a matrix $H$ is called the **transition matrix from $C$ to $D$**.

The significance of $H$ is that for any coordinate vector $w$ with respect to $C$, $H w$ is the coordinate vector with respect $D$. So $H$ is a device which transforms coordinates in one coordinate system into coordinates for another coordinate system.

TODO: Explain that there is a distinct difference between *coordinate vectors*, which is really just a column of numbers, and *vectors between points in the affine space oh god this needs a better name*, which can be thought of as an arrow between two points. The coordinate vector just specifies the coefficients that go along with the basis elements. The linear combination of basis elements specified by each coordinate vector determines the real vector.


# Time changes all things

I have not been entirely truthful up until now. When modeling things that move, it is common to use reference frames that *change*, for example a particle that moves in a circle can be modeled as a fixed point in a "rotating reference frame". But the reference frames we have specified so for are static, unchanging creatures. We need to broaden our definitions.

(Try #2) A **coordinate system** is a function $\mathbb{R} \to \mathbb{R}^2 \times \mathbb{R}^2$. This associates for each time $t$ a pair of orthonormal vectors $(u_1(t), u_2(t))$.

A **reference frame** is still the combination of an origin and a coordinate system.

The definition for transition matrix needs to change too, since  we now need a transition matrix at each time $t$. So $H(t)_{ij} = d_i(t) \cdot c_j(t)$.

A **particle** can be modeled as a function $\mathbb{R} \to A$. So a particle can (and generally does) move in the affine space.

If $\mathcal{C} = (O, C)$ is a reference frame, then a **trajectory of a particle with respect to $\mathcal{C}$** is a function $x: \mathbb{R} \to \mathbb{R}^2$. Then for every $t$, $x(t) = (x_1(t), x_2(t))$ for some scalar functions $x_1$ and $x_2$. For every $t$, $O \to (x_1(t) c_1(t) + x_2(t) c_2(t))$ is a point in $A$. In words, $x(t)$ is the coordinates of the particle with respect to $\mathcal{C}$.


TODO: An illustration of why rotating a reference frame by $\theta$ leads to the coordinate vector being rotated by $- \theta$. I'm thinking something slightly above the x-axis and a rotation in the positive direction that exceeds angle of the original coordinate vector.

# A special case

Let $\mathcal{C} = (o, C)$ and $\mathcal{D} = (o, D)$ be reference frames sharing the same origin with reference frames situated like this:

TODO: a pretty picture

At $t = 0$, $D$ is rotated $\theta$ away from $C$. Both reference frames are rotating at a constant speed, with angular velocities of $\omega_1$ and $\omega_2$, respectively, for $\mathcal{C}$ and $\mathcal{D}$.



## An introductory example.

$\mathcal{C} = (O, C)$ and $\mathcal{D} = (O, D)$ are reference frames. Suppose that

$$x(t) = r \begin{bmatrix} cos(\omega_1 t) \\
-sin(\omega_1 t) \end{bmatrix}$$

and

$$y(t) = r \begin{bmatrix} cos(\theta + \omega_2 t) \\
-sin(\theta + \omega_2 t) \end{bmatrix}$$

are the trajectories in $\mathcal{C}$ and $\mathcal{D}$, respectively, of some particle. We seek to understand the relationship between $x'(t)$ and $y'(t)$.

We'll determine the transition matrix $H$ first. Initially (at time $t = 0$), $\mathcal{D}$ is rotated $\theta$ with respect to $\mathcal{C}$. In general, $\mathcal{D}$ is rotated $\theta + (\omega_2 - \omega_1) t$. Hence

$$H(t) = \begin{bmatrix} cos(\theta + \omega t) & sin(\theta + \omega t) \\
-sin(\theta + \omega t) & cos(\theta + \omega t) \end{bmatrix}$$





## Where does this go?

$$\begin{bmatrix} 0 & \omega \\ - \omega & 0 \end{bmatrix}$$

If $\mathcal{C}$ rotates constantly at $\omega_1$ and $\mathcal{D}$ rotates at $\omega_2$, then

$$H'(t) = \begin{bmatrix} 0 & \omega \\ - \omega & 0 \end{bmatrix} H(t)$$



## First two examples

 1. "stationary point" with two constantly rotating ref frames (different speeds) and same origin

 2. a particle moving constant speed downwards in one ref frame versus another constantly rotating

 3. a particle falling under gravity (launched with initial velocity) with one "fixed" frame and another rotating


Point out in each case the coriolis theorem:

$$y'(t) = H(t) x'(t) + H'(t) x(t)$$




## dadadda

Every transition matrix $H(t)$ takes the form of

$$\begin{bmatrix} cos(\alpha(t)) & sin(\alpha(t)) \\
-sin(\alpha(t)) & cos(\alpha(t)) \end{bmatrix}$$

where $\alpha(t)$ is the angle that separates $\mathcal{C}$ and $\mathcal{D}$. More specifically, it is the angle that one must rotate $\mathcal{C}$ in order to turn it into $\mathcal{D}$ (we assume, for simplicity, that both frames have the same origin at all times).

$$H(t) = \begin{bmatrix} -\omega(t) sin(\alpha(t)) & \omega(t) cos(\alpha(t)) \\
-\omega(t) cos(\alpha(t)) & -\omega(t) sin(\alpha(t)) \end{bmatrix}$$

or

$$H'(t) = \Omega(t) H(t)$$

where $\omega(t) = \alpha'(t)$ and

$$\Omega(t) = \begin{bmatrix{ 0 & \omega(t) \\
- \omega(t) & 0 \end{bmatrix}$$

TODO: graphic comparing $\alpha(t)$, $\alpha(t+\epsilon)$ and $\epsilon \omega(t)$. Note that this illustrates $H(t) + \epsilon H'(t) = H(t+\epsilon)$.

Coriolis says that $H x' + \Omega y = y'$.
