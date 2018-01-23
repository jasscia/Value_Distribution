import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Myapp extends Component{
  constructor(props){
    super(props);
    this.state={ifOnlyShowInstock:false,
                searchName:""};
    
    this.handleSearch=this.handleSearch.bind(this);
    this.handleShowInstock=this.handleShowInstock.bind(this);
  };

  handleSearch(e){
    this.setState({
      searchName:e.target.value
    })
  };

  handleShowInstock(){
    this.setState({
      ifOnlyShowInstock: !this.state.ifOnlyShowInstock
    });
  }

  render(){
    var productList=[];
    if(this.state.searchName && this.state.ifOnlyShowInstock){
    // alert("search and in stock");
      this.props.data.map(item=>{
        if(item.name.indexOf(this.state.searchName)>-1 && item.stocked){
          productList.push(item);
        };
        return productList;
      });
    };

    if(this.state.searchName && !this.state.ifOnlyShowInstock){
      // alert("search and all");
      this.props.data.map(item=>{
        if(item.name.indexOf(this.state.searchName)>-1){
          productList.push(item);
        };
        return productList;
      });
    };

    if(!this.state.searchName && this.state.ifOnlyShowInstock){
      // alert("in stock");
      this.props.data.map(item=>{
        if(item.stocked){
          productList.push(item);
        };
        return productList;
      });
    };

    if(!this.state.searchName && !this.state.ifOnlyShowInstock){
      // alert("all");
      this.props.data.map(item=>{
        productList.push(item);
        return productList;
      });
    };

    return (
      <div className="App">
      
        <header className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
           <h1 className="App-title">Welcome to React</h1>
         </header>
        
        {/* <form> */}
          search<input value={this.state.searchName} onChange={this.handleSearch}/><br/>
          <input id="checkbox" type="checkbox" checked={this.state.ifOnlyShowInstock} onChange={this.handleShowInstock}/>
          <label for="checkbox"> if only product in stock</label>
        {/* </form> */}

        <ProList data={productList}></ProList>
      </div>
    )
  }
}


function ProList(props){
  const products=props.data;
  const productItem = products.map((product) =>
    <li key={product.name}>{product.name+"  ￥"+product.price}</li>
  );
  return (
    <ul>
      {productItem}
    </ul>
  );
}

export default Myapp;
