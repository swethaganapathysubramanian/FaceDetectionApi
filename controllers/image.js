const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: "84e609216d9f479683ea2d3cfeb38119"
});

const handleApiCall = (req, res) =>{
app.models
.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data =>{
    console.log(data);
    res.json(data);
})
.catch(err => res.status(400).json('unable to fork with Api'));
}

const imageHandle = (req, res, db ) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        }).catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    imageHandle: imageHandle,
    handleApiCall: handleApiCall
}