require(['vue', 'vue-resource', './constants.js', 'jquery'], function(Vue, Vuer, consts, $){
	console.log(consts.server);
	// var options;
	// Vue.use(Vuer);
	// Vue.use(VueT.client, options);

	new Vue({
		el:'#conditionsApp',
		data: {
			identifier: '',
			name: '',
			conditions:[
				{'identifier': 'equal', 'name': 'Equal'},
			]
		},
		// created: function(){
		// 	this.$http.get(consts.server + 'condition').then(function(response){
		// 		this.$data.conditions = response.data
		// 	});
		// },

		created:function(){
			self = this
					$.ajax(consts.server + 'condition', {
      					success: function(resp) {
      						self.$data.conditions = resp
      			}})},
		methods: {
			addCondition : function(){
				var disc = Object();
				disc.identifier = this.$data.identifier;
				disc.name = this.$data.name;
				this.$http.post(consts.server + 'update/condition', disc).then(function(response){
					this.conditions.push({'identifier': this.identifier, 'name': this.name});
				});
			},
			hardDeleteCondition : function(e){
				var disc = Object();
				disc.identifier = this.$data.identifier;
				disc.name = this.$data.name;
				disc.deleted_at = "some stuff xxx"
				this.$http.post(consts.server + 'harddelete/condition', disc).then(function(response){
					this.$data.conditions = response.data
					alert('finally')
				});
			}
		}
	});
});