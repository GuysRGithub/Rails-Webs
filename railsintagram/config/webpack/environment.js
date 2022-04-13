const { environment } = require('@rails/webpacker')
environment.plugins.prepend("Provode",
    new webpack.providePlugin({
        $: 'jquery/src/jquery',
        jQuery: 'jquery/src/jquery',
        Popper: ['popper.js', 'default']
    }))

module.exports = environment