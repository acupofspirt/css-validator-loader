# **css-validator-loader**

Simple webpack loader for css validation. Based on [csstree-validator](https://github.com/csstree/validator).

## **Install**

```js
npm i -D css-validator-loader
```

## **Usage**
Use it in pair with css/scss/whatevercss loader.
```js
module: {
    rules: [
      {
        test: /\.css?$/,
        loader: 'css-loader!css-validator-loader'
      }
    ]
  },
```

## **What is "valid"?**

[Here](https://csstree.github.io/docs/syntax.html) is described the grammar by which the validation is carried out.

## **License**

This software is released under the terms of the MIT license.