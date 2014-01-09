# Prerequisites

## Trig

The angle sum identities are needed.

$$sin(a + b) = sin(a) cos(b) + cos(a) sin(b)$$
$$cos(a + b) = cos(a) cos(b) - sin(a) sin(b)$$

Since $cos(-x) = cos(x)$ and (sin(-x) = - sin(x)$, we have:

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


# A special case

Let $(O, C)$ be a reference frame
