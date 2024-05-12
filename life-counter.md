{% include nav.html %}
# Life Counter

{% assign edition = "standard" %}


<div id = 'counter'> 30 </div>
<div id= 'life-controls'>
    <button onClick='save_life_to_cookie("gain")'> Gain (+) </button>
    <input id ='life-change' type='tel' placeholder='insert here'/> 
    <button onClick='save_life_to_cookie("lose")'> Lose (-)</button>
</div>


---

{% include life-counter-history.html %}
