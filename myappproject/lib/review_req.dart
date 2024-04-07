import 'package:flutter/material.dart';

class Request extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Review  Request"),
        ),
        body: Center(
          child: Text("No Pending Request"),
        ));
  }
}
