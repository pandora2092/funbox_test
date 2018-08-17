import React from 'react';
import ReactDOM from 'react-dom';



class BlockCat extends React.Component {

	constructor(props) {
       super(props);
       this.state = {
       	class1: this.props.colorClass, 
       	class2: this.props.subcolorclass, 
       	class3: this.props.numbercolor,
       	desc: this.props.desc,
       	classDesc: ' '
       };
       this.press = this.press.bind(this);
   }

	press() {
       let className1 = (this.state.class1===this.props.colorClass) ? "box_cat_bordergrey" : this.props.colorClass;
       let className2 = (this.state.class2===this.props.subcolorclass) ? "border_custom_grey" : this.props.subcolorclass;
       let className3 = (this.state.class3===this.props.numbercolor) ? "number_grey" : this.props.numbercolor;
       let descEmpty = (this.state.desc===this.props.desc) ? "Печалька," + ' ' + this.props.food + ' ' + "закончился." : this.props.desc;
       let descYellow = (this.state.classDesc===" ") ? "desc__yellow" : " ";
       this.setState({
	       class1: className1,
	       class2: className2,
	       class3: className3,
	       desc: descEmpty,
	       classDesc: descYellow
   		});
   }

	

	render() {

		const h2 = 'Нямушка';
		const p1 = 'Сказочное заморское яство';

		return (
			
			<div className="box_cat"> 
				<div className={'cat_inner' + ' ' + this.state.class1} onClick={this.press}>
					<div className={this.state.class2}>
						<p className="p1">{p1}</p>
						<h2 className="h2">{h2}</h2>
						<p className="p2">{this.props.food}</p>
						<p className="p3"><strong>{this.props.countFood}</strong> порций <br />
							{this.props.countMouse} в подарок</p>
						<img src="img/cat.jpg" alt="" />
						<div className={'number' + ' ' + this.state.class3}>
							<p className="p1">{this.props.count}</p>
							<p className="p2">кг</p>
						</div>
					</div>
				</div>
				<div className={'desc' + ' ' + this.state.classDesc} onClick={this.press}>{this.state.desc}</div>
			</div>

		);
	}
}

class BlockMain extends React.Component {
	render() {
		const h1 = "Ты сегодня покормил кота?";

		return (
			<div className="wrap_cat">
				<h1 className="h1">{h1}</h1>

				<div className="mainbox">
					<BlockCat desc="Чего сидишь? Порадуй котэ, купи." food='с фуа-гра' countMouse="мышь" countFood="10" count="0,5" colorClass='box_cat_borderblue' subcolorclass="border_custom_blue" numbercolor="number_blue" />
					<BlockCat desc="Головы щучьи с чесноком да свежайшая сёмгушка." food='с рыбой' countMouse="2 мыши" countFood="40" count="2" colorClass='box_cat_borderred' subcolorclass="border_custom_red" numbercolor="number_red"/>
					<BlockCat desc="Чего сидишь? Порадуй котэ, купи." food='с курой' countMouse="5 мышей" countFood="100" count="3" colorClass='box_cat_borderblue' subcolorclass="border_custom_blue" numbercolor="number_blue"/>
				</div>
			</div>

		);
	}
}



ReactDOM.render(
  <BlockMain />,
  document.getElementById('container')
);
