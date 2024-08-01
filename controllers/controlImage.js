const Clarifai = require('clarifai');

// Paste your own API key below
const app = new Clarifai.App({
    apiKey: process.env.API_KEY
   });
  
const controlApiCall = (req,res) => {
    app.models
    .predict('face-detection', req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Could not complete API Call'));
}

const controlImage = (req, res, knex) => {
    const { id } = req.body;
    knex('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable to update entries'));
}

exports.controlImage = controlImage;
exports.controlApiCall = controlApiCall;