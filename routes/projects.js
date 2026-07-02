const router = require('express').Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// Public: get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected: add project
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, techStack, liveLink, repoLink, imageUrl } = req.body;
    const project = new Project({ title, description, techStack, liveLink, repoLink, imageUrl });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected: delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
