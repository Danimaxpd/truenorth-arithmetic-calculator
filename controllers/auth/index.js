async function getToken(request, reply, fastify) {
    const { passId } = request.body;
  
    if (passId !== fastify.VALID_PASS_ID) {
      reply.status(401).send({message: 'Invalid credentials'});
      return;
    }
  
    const token = await fastify.jwt.sign({ payload: passId }, fastify.ENCODE_JWT, { expiresIn: fastify.EXPIRES_IN_JWT });
  
    reply.status(200).send({ token });
  }
  
  module.exports = { getToken };