var templates = {
    photo: '\
{{#list}}\
<div class="photo-detail-wrapper">\
    <div class="photo-wrapper"><img class="img-responsive" src="{{url}}"></div>\
    <dl class="photo-content clearfix">\
        <dt><img src="{{User.thumbnail_url}}" class="img-responsive"></dt>\
        <dd>\
            <h5>{{User.display_name}} <span class="datetime pull-right">{{UTCConvert create_time}}</span></h5>\
            <p>{{&title}}<br />{{#each tag_new}}<a href="#">#{{this}}</a> &nbsp;{{/each}}</p>\
        </dd>\
    </dl>\
    <div class="clearfix">\
        <div class="pull-left btn-group btn-group-sm">\
            <a href="#" class="btn btn-default">评论({{comment_count}})</a>\
            <a href="#" class="btn btn-default">喜欢({{good_count}})</a>\
        </div>\
        <div class="pull-right btn-group btn-group-sm dropup">\
            <button class="btn btn-default">…</button>\
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>\
            <ul class="dropdown-menu">\
                <li><a href="#" class="">转发</a></li>\
                <li><a href="#" class="">收藏</a></li>\
            </ul>\
        </div>\
    </div>\
    {{#Comments.list}}\
    <dl class="comment-list clearfix">\
        <dt><img src="{{User.thumbnail_url}}" class="img-responsive"></dt>\
        <dd>{{User.display_name}} {{&content}}\
        </dd>\
    </dl>\
    {{/Comments.list}}\
</div>\
{{/list}}'
};