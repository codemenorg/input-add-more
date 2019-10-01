### **Welcome to MultiItem Documantation** 

## **Introduction**
MultiItem is a jquery script that allows you to add multiple input or others with extensive customization

######Multi item wrapper
```
<div class="multi-element" data-input="items">

    <!-- 
        single elements here. Single element contains input sections with remove and sorting buttons. it may have multiple single elements 
    -->

</div>
```
######single element with remove button
```
<div class="single-element">
    <div>
        <input class="multi-input" data-key="first_name" name="items[0][first_name]" type="text" value="">
    </div>
    <div>
        <input class="multi-input" data-key="last_name" name="items[0][last_name]" type="text" value="">
    </div>
	
    <!-- remove item button -->
    <a href="javascript:;" class="btn btn-danger remove-item"><i class="fa fa-minus"></i></a>
</div>
```

######single element with sortable button.
```
<div class="single-element">
    <div>
        <input class="multi-input" data-key="first_name" name="items[0][first_name]" type="text" value="">
    </div>
    <div>
        <input class="multi-input" data-key="last_name" name="items[0][last_name]" type="text" value="">
    </div>
    
    <!-- remove item button -->
    <a href="javascript:;" class="btn btn-danger remove-item"><i class="fa fa-minus"></i></a>
    
    <!-- sorting item button -->
    <div class="move-place">
        <a class="move-up btn btn-danger" href="javascript:;"><i class="fa  fa-caret-up"></i></a>
        <a class="move-down btn btn-danger" href="javascript:;"><i class="fa fa-caret-down"></i></a>
    </div>
</div>
```

######So, your structure must be like this
You are not allowed to break the format at all. but you can add classes to those `tags` to customize. Also in the `input` container `div`, you can add extra elements if you need.
```
<div class="multi-element" data-input="items">
	<div class="single-element">
		<div>
			<input class="multi-input" data-key="first_name" name="items[0][first_name]" type="text" value="">
		</div>
		<div>
			<input class="multi-input" data-key="last_name" name="items[0][last_name]" type="text" value="">
		</div>
		
		<!-- remove item button -->
		
		<!-- sorting item button -->
	</div>
	<div class="single-element">
		<div>
			<input class="multi-input" data-key="first_name" name="items[1][first_name]" type="text" value="">
		</div>
		<div>
			<input class="multi-input" data-key="last_name" name="items[1][last_name]" type="text" value="">
		</div>
		
		<!-- remove item button -->
		
		<!-- sorting item button -->
	</div>
</div>
```
######Dropdown field
If you want to add a `dropdown` for a field the format wil be like it is given below
```
<div class="multi-element" data-input="items">
	<ul class="select-dropdown" style="display: none" id="floated-category">
		<li><input type="hidden" value="val1"><span>text 1</span></li>
		<li><input type="hidden" value="val2"><span>text 2</span></li>
	</ul>
	<ul class="select-dropdown" style="display: none" id="floated-subcategory">
		<li><input type="hidden" value="val1"><span>text 1</span></li>
		<li><input type="hidden" value="val2"><span>text 2</span></li>
	</ul>
	<div class="single-element">
		<div>
			<p class="single-unit form-control" data-id="floated-category">Select Option</p>
            		<input class="multi-input" data-key="name" name="items[0][name]" type="hidden" value="">
		</div>
		<div>
			<p class="single-unit form-control" data-id="floated-subcategory">Select Option</p>
            		<input class="multi-input" data-key="name" name="items[0][name]" type="hidden" value="">
		</div>
		
		<!-- remove item button -->
		
		<!-- sorting item button -->
	</div>
</div>
```
So, you can see, the `id` of first `ul` is placed in the first `p` tag's `data-id`, and second one is for second `p`. the `input` field is hidden there

######How to call
Inlude the script
`<link rel="stylesheet" href="path/to/flie/style.css">`
`<script src="path/to/flie/multiitem.js"></script>`

Call the script
```
$(document).ready(function () {
    $('.multi-element').multiitems({
        template: `
        <div>
            <input class="multi-input" data-key="first_name" name="" type="text" value="">
        </div>
        <div>
            <input class="multi-input" data-key="last_name" name="" type="text" value="">
        </div>
        `
    });
});
```
If you take a look carefully, we have not added `single-element` class or the `remove` or `sort` in the template. Those will be added automatically. We only added the core part with the `input wrapper` of the template also without the name of input field.

######Options
|Option|Default Value|Required|Uses|
|------|-------------|--------|----|
|template|null|Yes|This is the template that will be sorted, added or removed|
|removeButton|```<a href="javascript:;" class="btn btn-danger remove-item"><i class="fa fa-minus"></i></a>```|No|This is the html format of remove button that you can change|
|addButton|`<a href="javascript:;" class="btn btn-info add-item mb-2" style="display: none"><i class="fa fa-plus"></i></a>`|No|This is the html format of add button that you can change|
|moveButton|`<div class="move-place"><a class="move-up btn btn-danger" href="javascript:;"><i class="fa  fa-caret-up"></i></a><a class="move-down btn btn-danger" href="javascript:;"><i class="fa fa-caret-down"></i></a></div>`|No|This is the html format of sorting buttons that you can change|
|removeButtonClass|`remove-item`|No|This is the handler of remove button|
|addButtonClass|`add-item`|No|This is the handler of add button|
|moveUpButtonClass|`move-up`|No|This is the handler of sorting up button|
|moveDownButtonClass|`move-down`|No|This is the handler of sorting down button|
|inverse|`false`|No|Make true if sorting is required|
|insertable|`true`|No|Make false if want to disable adding new element|
|removable|`true`|No|Make false if want to disable removing element|
|max|0|No|Integer value. If 0, you can add unlimited item or put a positive integer to limit the adding|
|externalFunction|null|No|call an external function on add item. value type must be array and maximum 2 items where first item is function name and second item (optional) is true/false. if true then multiitem returns the added dom|

######Some Classes
`.single-element .full-width` - makes the child `div` of `.single-element` full width

`.single-element .half-width` - makes the child `div` of `.single-element` half width

`.single-element .one-third-width` - makes the child `div` of `.single-element` one-third width

`.single-element .two-third-width` - makes the child `div` of `.single-element` two-third width

`.single-element .one-fourth-width` - makes the child `div` of `.single-element` one-fourth width

`.single-element .three-fourth-width` - makes the child `div` of `.single-element` three-fourth width

`.multi-element` - use this class in the grand wrapper

`.single-element` - use this class as the single item wrapper

`p.single-unit` - use this class for `p` tag for dropdown

`.multi-input` - use this class for every `input` tag

`.select-dropdown` - use this class for every `ul` tag which will be used as dropdown

`.multi-element.sortable` - use it with `.multi-element` if you want the items sortable

`You must add font awesome to get all those icons related to the multi item element`

---------------------------------------------------------------------------------------

## **Range**
range is a jquery script extended from multiitem.js that allows you to add multiple input or others with extensive customization for range purpose like grading system. It works exactly like multiitem but some options are not available and the single-element section is little different as it doesn't have max, inversing, remove disabling and sortable option. Also custom dropdown option is unavailable. For everything else follow the doc of multi item

######Options that are not available
`moveUpButtonClass`, `moveDownButtonClass`, `inverse`, `insertable`, `removable`, `max`, `externalFunction`

######How to call
Inlude the script
`<link rel="stylesheet" href="path/to/flie/style.css">`
`<script src="path/to/flie/percent-range.js"></script>`

Call the script
```
$(document).ready(function () {
    $('.multi-element').multiitems({
        template: `
        <div class="half-width">
	        <input class="multi-input form-control min" data-key="min" name="" type="number" value="" placeholder="min" min="" max="">
	    </div>
	    <div class="half-width">
	        <input class="multi-input form-control max" data-key="max" name="" type="number" value="" placeholder="max" min="" max="">
	    </div>
        `
    });
});
```

######single element with remove button
```
<div class="single-element">
    <div class="half-width">
        <input class="multi-input form-control min" data-key="min" name="items[0][min]" type="number" value="0" placeholder="min" min="0" max="99">
    </div>
    <div class="half-width">
        <input class="multi-input form-control max" data-key="max" name="items[0][max]" type="number" value="50" placeholder="max" min="1" max="100">
    </div>
	
    <!-- remove item button -->
    <a href="javascript:;" class="btn btn-danger remove-item"><i class="fa fa-minus"></i></a>
</div>
```


######Some Classes
`.disabled-button` - it is used to disable buttons if min, max fields doesn't contain integer