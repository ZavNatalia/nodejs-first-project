exports.getNotFoundPage = (req, res)=>{
    res.status(404).render('not-found', {pageTitle: 'Page Not Found', path: ''});
};