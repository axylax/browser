function parseAuth(req) {
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (!token) return null;
  return { user_id: 'demo-user', tenant_id: token }; // template: token maps to tenant
}

module.exports = { parseAuth };
