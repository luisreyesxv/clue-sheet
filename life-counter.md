{% include nav.html %}
# Life Counter

{% assign edition = "standard" %}


<div id = 'counter'> 30 </div>

<button onClick='save_life_to_cookie("gain")'> gain life </button>
<input id ='life-change' type='tel'/> 
<button onClick='save_life_to_cookie("lose")'> lose life </button>


---

{% include life-counter-history.html %}
