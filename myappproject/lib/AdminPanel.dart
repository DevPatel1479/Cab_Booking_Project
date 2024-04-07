import 'package:flutter/material.dart';
import 'package:myappproject/review_req.dart';
import 'AddEmployee.dart';
import 'Dashboard_screen.dart';

class AdminPanel extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: AdminHome(),
    );
  }
}

class AdminHome extends StatefulWidget {
  @override
  _AdminHomeState createState() => _AdminHomeState();
}

class _AdminHomeState extends State<AdminHome> {
  bool isHovered = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromARGB(
          255, 220, 240, 255), // Match the second card's background color
      body: Stack(
        children: [
          Positioned(
            top: 0,
            left: 1,
            right: 0,
            child: ClipRRect(
              borderRadius: BorderRadius.only(
                bottomLeft: Radius.circular(20.0),
                bottomRight: Radius.circular(20.0),
                topLeft: Radius.circular(20.0), // Only top corners are curved
                topRight: Radius.circular(20.0),
              ),
              child: Container(
                height: MediaQuery.of(context).padding.top +
                    AppBar().preferredSize.height +
                    30,
                color: Colors.blue, // Change color as needed
                child: Center(
                  child: Padding(
                    padding: const EdgeInsets.only(top: 30.0),
                    child: Text(
                      'Welcome Admin',
                      style: TextStyle(
                        fontSize: 24.0,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
          Positioned.fill(
            top: MediaQuery.of(context).padding.top +
                AppBar().preferredSize.height +
                30 +
                5, // Add padding from the top shape
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(20.0),
                  topRight: Radius.circular(20.0),
                ),
              ),
              margin: EdgeInsets.symmetric(horizontal: 2.0),
            ),
          ),
          Positioned(
            top: MediaQuery.of(context).padding.top +
                AppBar().preferredSize.height +
                30 +
                5 +
                10, // Add padding from the top shape and spacing
            left: 20, // Adjust left position
            right: 20, // Adjust right position
            child: Container(
              width: MediaQuery.of(context).size.width -
                  40, // Screen width minus margins
              padding: EdgeInsets.all(16.0),
              child: Column(
                children: [
                  Card(
                    elevation: 3,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(
                          30.0), // Adjusted border radius for the card
                    ),
                    child: Container(
                      width: MediaQuery.of(context).size.width -
                          40, // Example width
                      height: 220, // Example height
                      padding: EdgeInsets.all(16.0),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                            Color.fromARGB(255, 180, 210, 250),
                            Color.fromARGB(255, 220, 240, 255),
                          ],
                        ),
                        borderRadius: BorderRadius.circular(
                            30.0), // Adjusted border radius for the button
                      ),
                      child: Column(
                        children: [
                          SizedBox(height: 10), // Add spacing
                          Image.asset(
                            'assets/images/e_img.png', // Image path
                            height: 100, // Adjusted image height
                          ),
                          SizedBox(height: 10), // Add spacing
                          MouseRegion(
                            onEnter: (_) {
                              setState(() {
                                isHovered = true;
                              });
                            },
                            onExit: (_) {
                              setState(() {
                                isHovered = false;
                              });
                            },
                            child: Container(
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(
                                    30.0), // Adjusted border radius for the button
                                gradient: isHovered
                                    ? LinearGradient(
                                        begin: Alignment.centerLeft,
                                        end: Alignment.centerRight,
                                        colors: [
                                          Colors.blue[900]!, // Dark blue
                                          Colors.blue[
                                              800]!, // Slightly lighter blue
                                        ],
                                      )
                                    : null,
                                color: isHovered
                                    ? null
                                    : Color.fromARGB(255, 116, 132, 229),
                              ),
                              child: TextButton(
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    PageRouteBuilder(
                                      pageBuilder: (context, animation,
                                              secondaryAnimation) =>
                                          AddEmp(),
                                      transitionsBuilder: (context, animation,
                                          secondaryAnimation, child) {
                                        return SlideTransition(
                                          position: Tween<Offset>(
                                            begin: const Offset(1.0, 0.0),
                                            end: Offset.zero,
                                          ).animate(animation),
                                          child: child,
                                        );
                                      },
                                    ),
                                  );
                                },
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(
                                      'Add Employee',
                                      style: TextStyle(color: Colors.white),
                                    ),
                                    Icon(
                                      Icons.arrow_forward_ios,
                                      color: Colors.white,
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 10), // Add spacing between the cards
                  Card(
                    elevation: 3,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(
                          30.0), // Rounded border for the card
                    ),
                    child: Container(
                      width: MediaQuery.of(context).size.width -
                          40, // Example width
                      height: 220, // Example height
                      padding: EdgeInsets.all(16.0),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                            Color.fromARGB(255, 180, 210, 250),
                            Color.fromARGB(255, 220, 240, 255),
                          ],
                        ),
                        borderRadius: BorderRadius.circular(30.0),
                      ),
                      child: Column(
                        children: [
                          Image.asset(
                            'assets/images/d.png', // Image path for the third card
                            height: 130, // Adjusted image height
                          ),
                          SizedBox(height: 10), // Add spacing
                          SizedBox(
                            width: double.infinity,
                            height: 45, // Increase button height
                            child: TextButton(
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  PageRouteBuilder(
                                    pageBuilder: (context, animation,
                                            secondaryAnimation) =>
                                        Dash(),
                                    transitionsBuilder: (context, animation,
                                        secondaryAnimation, child) {
                                      return SlideTransition(
                                        position: Tween<Offset>(
                                          begin: const Offset(1.0, 0.0),
                                          end: Offset.zero,
                                        ).animate(animation),
                                        child: child,
                                      );
                                    },
                                  ),
                                );
                              },
                              style: ButtonStyle(
                                backgroundColor:
                                    MaterialStateProperty.all<Color>(
                                  Colors.blue,
                                ),
                                shape:
                                    MaterialStateProperty.all<OutlinedBorder>(
                                  RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(
                                        30.0), // Adjusted border radius for the button
                                  ),
                                ),
                              ),
                              child: Text(
                                'Dashboard',
                                style: TextStyle(
                                  color: Colors.white,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 10), // Add spacing between the cards
                  Card(
                    elevation: 3,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(
                          55.0), // Rounded border for the card
                    ),
                    child: Container(
                      width: MediaQuery.of(context).size.width -
                          40, // Example width
                      height: 200, // Example height
                      padding: EdgeInsets.all(16.0),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                            Color.fromARGB(255, 255, 150, 150),
                            Color.fromARGB(255, 255, 200, 200),
                          ],
                        ),
                        borderRadius: BorderRadius.circular(55.0),
                      ),
                      child: Column(
                        children: [
                          Image.asset(
                            'assets/images/request.png', // Image path for the third card
                            height: 120, // Adjusted image height
                          ),
                          SizedBox(height: 2), // Add spacing
                          SizedBox(
                            width: double.infinity,
                            height: 40, // Increase button height
                            child: TextButton(
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  PageRouteBuilder(
                                    pageBuilder: (context, animation,
                                            secondaryAnimation) =>
                                        Request(),
                                    transitionsBuilder: (context, animation,
                                        secondaryAnimation, child) {
                                      return SlideTransition(
                                        position: Tween<Offset>(
                                          begin: const Offset(1.0, 0.0),
                                          end: Offset.zero,
                                        ).animate(animation),
                                        child: child,
                                      );
                                    },
                                  ),
                                );
                              },
                              style: ButtonStyle(
                                backgroundColor:
                                    MaterialStateProperty.all<Color>(
                                  Colors.blue,
                                ),
                                shape:
                                    MaterialStateProperty.all<OutlinedBorder>(
                                  RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(
                                        30.0), // Adjusted border radius for the button
                                  ),
                                ),
                              ),
                              child: Text(
                                'View Requests',
                                style: TextStyle(
                                  color: Colors.white,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
