var templates = {
    photo: '\
{{#list}}\
<div class="photo-detail-wrapper">\
    <div class="photo-wrapper"><img class="img-responsive" src="{{url}}"></div>\
    <dl class="photo-content clearfix">\
        <dt><img src="{{User.thumbnail_url}}" class="img-responsive"></dt>\
        <dd>\
            <h5>{{User.display_name}} <span class="datetime pull-right">{{UTCConvert create_time}}</span></h5>\
            <p>{{&title}} &nbsp;{{#each tag_new}}<a href="#">#{{this}}</a> &nbsp;{{/each}}</p>\
        </dd>\
    </dl>\
    <div class="photo-comment-list">\
        {{#Comments.list}}\
        <dl class="comment clearfix">\
            <dt><img src="{{User.thumbnail_url}}" class="img-responsive"></dt>\
            <dd>{{User.display_name}} {{&content}}</dd>\
        </dl>\
        {{/Comments.list}}\
    </div>\
    <div class="photo-ops clearfix">\
        <div class="pull-left btn-group btn-group-sm">\
            <a href="#" class="btn btn-default">喜欢({{good_count}})</a>\
            <a href="#" class="btn btn-default">评论({{comment_count}})</a>\
        </div>\
        <button class="btn btn-sm btn-default pull-right">…</button>\
    </div>\
</div>\
{{/list}}'
};