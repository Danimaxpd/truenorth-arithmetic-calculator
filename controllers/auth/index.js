const bcrypt = require("bcrypt")

async function getToken(request, reply, fastify) {
  const { passId, username, password } = request.body;

  if (passId !== fastify.VALID_PASS_ID) {
    reply.status(401).send({ message: 'Invalid credentials' });
    return;
  }
  const user = await fastify.prisma.User.findUnique({ where: { username } });
  if (!user) {
    reply.status(401).send({ message: 'Invalid credentials' });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    reply.status(401).send({ message: 'Invalid credentials' });
    return;
  }

  const token = await fastify.jwt.sign({ payload: passId, userId: user.id}, fastify.ENCODE_JWT, { expiresIn: fastify.EXPIRES_IN_JWT });

  reply.status(200).send({ token });
}

module.exports = { getToken };