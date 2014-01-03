(function ( $ ) {
 
    $.fn.bediText = function( options ) {
 
        var settings = $.extend({
            url : "your-url-here"
        }, options );
    
        var str = '<div class="btn-group"><a href="#" id="add-latex" class="btn btn-default flat">$$Latex$$ $$</a><a href="#" id="add-bold" class="btn btn-default flat"><b>Bold</b> &#60b&#62</a><a href="#" id="add-italic" class="btn btn-default flat"><i>Italic</i> &#60i&#62</a><a href="#" id="add-underline" class="btn btn-default flat"><u>Underline</u> &#60u&#62</a><a href="#" id="add-image" class="btn btn-default flat">Image</a><form enctype="multipart/form-data" id="upload-file"><input type="file" name="file" id="file" style="display: none;" /></form></div>';

        var id = this.attr('id');

        $(this).before(str);

        $('#add-latex').click(function(){
            replaceTag("$$","$$");
        });

        $('#add-bold').click(function(){
            replaceTag("<b>","</b>");
        });

        $('#add-italic').click(function(){
            replaceTag("<i>","</i>");
        });

        $('#add-underline').click(function(){
            replaceTag("<u>","</u>");
        });

        function replaceTag(begin_tag, end_tag){
            var textarea = document.getElementById(id);
            var question = $('#'+id).val();
            var start = textarea.selectionStart;
            var end = textarea.selectionEnd;
            if(start == end) return false ;

            var len = textarea.length;
            var replace = question.substring(start,end);
            replace = begin_tag + replace + end_tag;
            $('#'+id).val( question.substring(0,start) + replace + question.substring(end,len) );
        }


        $("#add-image").click(function() {
            $("input[id='file']").click();
        });

        $("input[id='file']").change(function (){
        
            var formData = new FormData($('#upload-file')[0]);
            $.ajax({
                url: settings.url, 
                type: 'POST',
                xhr: function() {  // Custom XMLHttpRequest
                    var myXhr = $.ajaxSettings.xhr();
                    return myXhr;
                },
                //Ajax events
                // beforeSend: beforeSendHandler,
                success: completeHandler,
                // error: errorHandler,
                // Form data
                data: formData,
                //Options to tell jQuery not to process data or worry about content-type.
                cache: false,
                contentType: false,
                processData: false
            });

        });
 
    };
 
}( jQuery ));
