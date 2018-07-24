# **css-validator-loader**

Simple webpack loader for CSS validation. Based on [csstree-validator](https://github.com/csstree/validator).

## **Install**

```js
npm i -D css-validator-loader
```

## **Usage**
Use it in pair with any css/scss/postcss loader.
```js
module: {
  rules: [
    {
      test: /\.css?$/,
      loader: 'css-loader!css-validator-loader'
    }
  ]
}
```

## **About**  
This loader will help you detect syntax errors and typos in your stylesheets by friendly warnings in console.


[Here](https://csstree.github.io/docs/syntax.html) is described the grammar by which the validation is performed.

Compatible with Webpack 2-4.

## **License**

This software is released under the terms of the MIT license.
