using System;
using System.Collections.Generic;

namespace PS.Base64ToString
{
    class Base64ToString
    {
        static void Main(string[] args)
        {
            string input = "<your_thumbprint>";
					//format: 00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00"
            string[] arr = input.Split(':');
            List<byte> hexes = new List<byte>();
            foreach (string s in arr)
            {
                hexes.Add(Convert.ToByte(s, 16));
            }
            string convert = Convert.ToBase64String(hexes.ToArray());
            Console.WriteLine(convert);
        }
    }
}
