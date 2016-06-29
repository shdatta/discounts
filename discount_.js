 require(['vue', 'vue-resource', 'v-pagination', 'vue-tables','./constants.js', 'jquery'], function(Vue, Vuer, Vpag, VueT, consts, $){
// require(['vue', 'vue-resource', './constants.js', 'jquery'], function(Vue, Vuer, consts, $){
	console.log(consts.server);
	var options;
	Vue.use(Vuer);
	// Vue.use(VueTables.client);

	new Vue({
		el:'#conditionsApp',
		data: {
   		   columns:['identifier','name'],
      		options: {
     		},
     		conditions:[]
  		},
		// created: function(){
		// 	this.$http.get(consts.server + 'condition/all').then(function(response){
		// 		this.$data.conditions = response.data
		// 	});
		// },

		created:function(){
			self = this
					$.ajax(consts.server + 'condition/all', {
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

			// 	hardDeleteCondition : function(e){
			// 	var disc = Object();
			// 	disc.identifier = this.$data.identifier;
			// 	disc.name = this.$data.name;
			// 	disc.deleted_at = "some stuff xxx"

			// 	 $.ajax({
   //          		type: 'post',
   //          		url: consts.server + 'harddelete/condition',
   //          		data: JSON.stringify(disc),
   //          		// contentType: "text/plain",
   //          		contentType: "application/json; charset=utf-8",
   //          		// traditional: true,
   //          		crossDomain: true,
   //          		success: function (data) {
   //          			alert('good')
   //      		    },
   //      		    error:function(err){
   //      		    	alert('failed')
   //      		    }
   //      		});
			// }
		}
	});
});